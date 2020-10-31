class Palette < ApplicationRecord
    has_many :tones
    accepts_nested_attributes_for :tones
end
