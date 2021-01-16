class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :email,unique: true
      t.string :url
      t.string :first_name,unique: true
      t.string :last_name,unique: true

      t.timestamps
    end
  end
end
