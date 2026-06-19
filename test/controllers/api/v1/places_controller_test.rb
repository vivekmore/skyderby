require 'test_helper'

class Api::V1::PlacesControllerTest < ActionDispatch::IntegrationTest
  test '#index - returns places with country and pagination meta' do
    get api_v1_places_url

    body = response.parsed_body
    assert_response :success
    assert_kind_of Array, body['places']
    assert_predicate body['places'], :any?

    place = body['places'].first
    assert_equal %w[country id kind latitude longitude name].sort, place.keys.sort
    assert place['country'].key?('name')
    assert body['meta'].key?('totalCount')
  end

  test '#index - filters by query' do
    place = places(:hellesylt)

    get api_v1_places_url(query: place.name)

    names = response.parsed_body['places'].pluck('name')
    assert_includes names, place.name
  end

  test '#show - returns the place' do
    place = places(:hellesylt)

    get api_v1_place_url(place)

    assert_response :success
  end
end
