class Comment < ApplicationRecord
  validates :content, presence: true
  validates :commenter, presence: true
end
