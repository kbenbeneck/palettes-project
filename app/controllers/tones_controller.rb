class TonesController < ApplicationController
    def index
        tones = Tone.all
        render json: ToneSerializer.new(tones).to_serialized_json
    end
end
