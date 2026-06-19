json.key_format! camelize: :lower

json.profiles @profiles do |profile|
  json.extract! profile, :id, :name, :country_id
end

json.meta do
  json.current_page @profiles.current_page
  json.total_pages @profiles.total_pages
  json.total_count @profiles.total_count
end
