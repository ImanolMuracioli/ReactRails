class ProductSerializer < ActiveModel::Serializer
  

  include Rails.application.routes.url_helpers
  attributes :id, :name, :price, :image_product
  def image_product
    if object.image_product.attached?
      {
        url: rails_blob_url(object.image_product)
      }
    end
  end

end
