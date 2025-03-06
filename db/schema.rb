# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_03_06_152434) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "bmi_calculators", force: :cascade do |t|
    t.integer "user_id", null: false
    t.decimal "weight", precision: 5, scale: 2, null: false
    t.decimal "height", precision: 5, scale: 2, null: false
    t.decimal "bmi", precision: 4, scale: 2
    t.boolean "is_pregnant", default: false
    t.decimal "pre_pregnancy_weight", precision: 5, scale: 2
    t.decimal "weight_goal", precision: 5, scale: 2
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "created_at"], name: "index_bmi_calculators_on_user_id_and_created_at"
    t.index ["user_id"], name: "index_bmi_calculators_on_user_id"
  end

  create_table "menstrual_cycle_calculators", force: :cascade do |t|
    t.integer "user_id", null: false
    t.date "last_period_date", null: false
    t.integer "cycle_length", default: 28
    t.integer "period_duration", default: 5
    t.date "fertility_window_start"
    t.date "fertility_window_end"
    t.date "ovulation_date"
    t.date "next_period_date"
    t.text "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "created_at"], name: "index_menstrual_cycle_calculators_on_user_id_and_created_at"
    t.index ["user_id"], name: "index_menstrual_cycle_calculators_on_user_id"
  end

  create_table "pregnancy_calculators", force: :cascade do |t|
    t.integer "user_id", null: false
    t.date "last_menstrual_period_date", null: false
    t.date "due_date"
    t.integer "weeks"
    t.integer "days"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id", "created_at"], name: "index_pregnancy_calculators_on_user_id_and_created_at"
    t.index ["user_id"], name: "index_pregnancy_calculators_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name", default: "", null: false
    t.string "last_name", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.decimal "height", precision: 5, scale: 2
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "bmi_calculators", "users"
  add_foreign_key "menstrual_cycle_calculators", "users"
  add_foreign_key "pregnancy_calculators", "users"
end
