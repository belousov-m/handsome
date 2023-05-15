class CreateRound < ActiveRecord::Migration[6.1]
  def change
    create_table :rounds do |t|
      t.string :name
      t.integer :bank

      t.timestamps
    end
  end
end
