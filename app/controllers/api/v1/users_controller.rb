class Api::V1::UsersController < ApplicationController
    def create
        user = User.new(params.permit(:username,:password,:email))
        if (user.save)
            render json: user, status: :created
        else
            render json: user.errors, status: :unprocessable_entity
        end
    end
end
