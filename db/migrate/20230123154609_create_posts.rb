class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.string :title, null: false
      t.text :category, null: false
      t.text :bod, null: false
      t.string :image, default: 'https://images.gawker.com/17eivzah7yub3jpg/c_scale,fl_progressive,q_80,w_800.jpg'

      t.timestamps
    end
  end
end
