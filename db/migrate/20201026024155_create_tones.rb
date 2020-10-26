class CreateTones < ActiveRecord::Migration[6.0]
  def change
    create_table :tones do |t|
      t.string :hex
      t.references :palette, null: false, foreign_key: true

      t.timestamps
    end
  end
end
