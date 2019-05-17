class RenamePaymentTenantId < ActiveRecord::Migration[5.1]
  def change
    rename_column :payments, :tenant_id_id, :tenant_id
  end
end
