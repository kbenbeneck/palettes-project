class PaletteSerializer
    
    def initialize(palette_object)
        @palette = palette_object
    end

    def to_serialized_json
        options = {
            include: [:tones],
            except: [:created_at, :updated_at]
        }
        @palette.to_json(options)
    end
end
