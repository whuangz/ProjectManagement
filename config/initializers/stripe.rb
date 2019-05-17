Rails.configuration.stripe = {
  publishable_key: "pk_test_t24W682VNxTN7ytv8qcuTjV0",
  secret_key: "sk_test_jViEHQuZe8LzpiRnZSViHhfI"
}

Stripe.api_key= Rails.configuration.stripe[:secret_key]
