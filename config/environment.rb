# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!

ActionMailer::Base.smtp_settings = {
  address: "smtp.gmail.com",
  domain: "mail.google.com",
  port: 587,
  user_name: "yunalee107@gmail.com",
  password: "Meli@0308",
  authentication: "login",
  enable_starttls_auto: true
}
