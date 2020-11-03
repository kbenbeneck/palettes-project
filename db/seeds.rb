# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

pale_1 = Palette.create(background: "Testing")
pale_2 = Palette.create(background: "Testing")
pale_3 = Palette.create(background: "Testing")

tone_1 = Tone.create(hex: "Test", palette: pale_1)
tone_2 = Tone.create(hex: "Test", palette: pale_2)
tone_3 = Tone.create(hex: "Test", palette: pale_2)
tone_4 = Tone.create(hex: "Test", palette: pale_3)
tone_5 = Tone.create(hex: "Test", palette: pale_3)
tone_6 = Tone.create(hex: "Test", palette: pale_3)
