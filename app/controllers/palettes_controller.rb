class PalettesController < ApplicationController
    def index
        palettes = Palette.all
        render json: palettes, include: [:tones] 
    end

    def show
        palatte = Palette.find_by(id: params[:id])
        if palatte
            render json: {
                id: palatte.id, 
                name: palatte.name, 
                background: palatte.background, 
                tones: palatte.tones }
        else
            render json: { message: 'Nope' }
        end
    end
end
