class CreatePalettes < ActiveRecord::Migration[6.0]
  def change
    create_table :palettes do |t|
      t.string :background

      t.timestamps
    end
  end
end
