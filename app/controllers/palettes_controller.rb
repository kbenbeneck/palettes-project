class PalettesController < ApplicationController
    def index
        palettes = Palette.all
        render json: PaletteSerializer.new(palettes).to_serialized_json
    end

    def show
        palette = Palette.find_by(id: params[:id])
        if palette
            render json: PaletteSerializer.new(palette).to_serialized_json
        else
            render json: { message: 'Nope' }
        end
    end
end
