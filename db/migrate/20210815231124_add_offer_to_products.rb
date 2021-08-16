class AddOfferToProducts < ActiveRecord::Migration[6.1]
  def change
    add_column :products, :offer, :integer
  end
end
