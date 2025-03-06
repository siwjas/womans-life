class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :trackable

  # Associations
  has_many :pregnancy_calculators, dependent: :destroy
  has_many :menstrual_cycle_calculators, dependent: :destroy
  has_many :bmi_calculators, dependent: :destroy

  # Validations
  validates :email, presence: true, uniqueness: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :height, presence: true, numericality: { greater_than: 0 }, allow_nil: true
  validates :agreed_to_terms, acceptance: true
  validates :password, presence: true, length: { minimum: 6 }, on: :create

  # Methods
  def full_name
    "#{first_name} #{last_name}"
  end
end
