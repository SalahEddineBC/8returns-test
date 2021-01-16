class UsersController < ApplicationController
  BASE_URL="http://apilayer.net/api/check?access_key=d14c928edf3d6d4a54427cd45e3ac465&smtp=1&format=1"
  def index
    #get all rows
    @users = User.all.order(created_at: :desc)
    return render json:{data:@users}
  end

  def create
    #basic request valid
    return render json: {message:"Bad Request"}, status: 400 unless user_params[:url].present? &&user_params[:first_name].present? &&user_params[:last_name].present?
    # check if url, name are valid
    url=user_params[:url]
    return render json: {message:"Uncorrect Url"}, status: 400 unless is_valid_url(url)

    firstName=user_params[:first_name].gsub(/\s+/, "")
    lastName=user_params[:last_name].gsub(/\s+/, "")
    return render json: {message:"Uncorrect Name"}, status: 400 unless is_valid_name(firstName) && is_valid_name(lastName)
    #generate email combinations 
    @addresses=[]
    @addresses<<"#{firstName.downcase}.#{lastName.downcase}@#{url.downcase}"
    @addresses<<"#{firstName.downcase}@#{url.downcase}"
    @addresses<<"#{firstName.downcase}#{lastName.downcase}@#{url.downcase}"
    @addresses<<"#{lastName.downcase}.#{firstName.downcase}@#{url.downcase}"
    @addresses<<"#{firstName[0].downcase}.#{lastName.downcase}@#{url.downcase}"
    @addresses<<"#{firstName[0].downcase}#{lastName[0].downcase}@#{url.downcase}"
    # ignore the request if an email is already saved in the db
    return render json:{message:'User exists already'}, status:422 if User.where(email:@addresses).length>0

    valid_email=nil
    # we check each email and we stop at the first valid one
    @addresses.each do |address|
      response = HTTParty.get("#{BASE_URL}&email=#{address}")
      body= JSON.parse(response.body)
      if body["format_valid"]==true && body["mx_found"]==true && body["smtp_check"]==true
        valid_email=address
        break
      end
    end
    #if no email is valid, an error is returned
    return render json: {message:"Can't find an email for this user"}, status: :not_found if valid_email.nil?

    # we save the user that we found 
    object= user_params.merge!(email: valid_email)
    @user= User.new(object)
    if @user.save
      render json: {message:"created"}, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private
  def user_params
    params.require(:data).permit(:first_name,:last_name,:url)
  end
  def is_valid_url(url)
    url=~/^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/
  end
  def is_valid_name(name)
    name =~/^[[:alpha:][:blank:]]+$/
  end
end
