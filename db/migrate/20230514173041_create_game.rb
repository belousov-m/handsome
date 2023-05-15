class CreateGame < ActiveRecord::Migration[6.1]
  def change
    create_table :games do |t|
      t.string :name
      t.integer :bank

      t.timestamps
    end
  end
end
