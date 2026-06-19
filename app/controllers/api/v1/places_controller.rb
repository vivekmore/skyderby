module Api
  module V1
    class PlacesController < Api::ApplicationController
      def index
        @places =
          Place
          .search(params[:query])
          .includes(:country)
          .order(:name)
          .page(params[:page])
          .per(50)
      end

      def show
        @place = Place.find(params[:id])
      end
    end
  end
end
