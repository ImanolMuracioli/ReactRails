class Api::V1::ProductsController < ApplicationController
  #skip_before_action :verify_authenticity_token

  def index
    @products = Product.all
    render json: @products
  end

  def show
    @product = Product.find(params[:id])
    session[:visit_count] ||= 0
    session[:visit_count] += 0
    @visit_count = session[:visit_count]
    render json: @product
  end

  def create
    @product = Product.new(product_params)
    if @product.save
      render json: @product, status: :created
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  def update
    @product = Product.find(params[:id])
    if @product.update(product_params)
      render json: @product, status: :ok
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @product = Product.find(params[:id])
    @product.destroy
    head :no_content
  end

  
  private

  def product_params
    params.permit(:id,:name, :price,:image_product,:offer)

  end
end

