class Post < ApplicationRecord
  validates :title, presence: true
  validates :category, presence: true
  validates :bod, presence: true
end
