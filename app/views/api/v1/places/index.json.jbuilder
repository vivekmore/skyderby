json.key_format! camelize: :lower

json.places @places do |place|
  json.extract! place, :id, :name, :kind
  json.latitude place.latitude.to_f
  json.longitude place.longitude.to_f
  json.country do
    json.name place.country&.name
    json.code place.country&.code
  end
end

json.meta do
  json.current_page @places.current_page
  json.total_pages @places.total_pages
  json.total_count @places.total_count
end
