class ToneSerializer
    
    def initialize(tone_object)
        @tone = tone_object
    end

    def to_serialized_json
        options = {
            except: [:created_at, :updated_at]
        }
        @tone.to_json(options)
    end
end
