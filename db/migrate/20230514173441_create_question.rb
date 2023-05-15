class CreateQuestion < ActiveRecord::Migration[6.1]
  def change
    create_table :questions do |t|
      t.string :description
      t.boolean :done, default: false

      t.timestamps
    end
  end
end
