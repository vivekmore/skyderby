module Api
  module V1
    class ProfilesController < Api::ApplicationController
      def index
        @profiles =
          Profile
          .search(params[:query])
          .includes(:country)
          .order(:name)
          .page(params[:page])
          .per(50)
      end

      def show
        @profile =
          Profile
          .includes(personal_top_scores: { virtual_competition: :group })
          .find(params[:id])
      end
    end
  end
end
