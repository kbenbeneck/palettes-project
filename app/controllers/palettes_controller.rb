class PalettesController < ApplicationController
    def index
        palettes = Palette.all
        render json: PaletteSerializer.new(palettes).to_serialized_json
    end

    def show
        palatte = Palette.find_by(id: params[:id])
        if palatte
            render json: PaletteSerializer.new(palette).to_serialized_json
        else
            render json: { message: 'Nope' }
        end
    end
end
