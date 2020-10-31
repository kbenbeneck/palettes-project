class TonesController < ApplicationController
    def index
        tones = Tone.all
        render json: ToneSerializer.new(tones).to_serialized_json
    end

    def create
        palette = Palette.find(params[:palette_id])
        tones = palette.tones.create(tones_params)
        if tones.save
            render json: ToneSerializer.new(tones).to_serialized_json
        else
            render json: tones.errors
        end

    end

    private

    def tones_params
        params.require(:tone).permit(:id, :hex, :palette_id)
    end

end
