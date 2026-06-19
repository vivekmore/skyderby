require 'test_helper'

class Api::V1::ProfilesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @profile = profiles(:alex)
  end

  test '#index - returns profiles with pagination meta' do
    get api_v1_profiles_url

    body = response.parsed_body
    assert_response :success
    assert_kind_of Array, body['profiles']
    assert body['meta'].key?('totalCount')
  end

  test '#index - filters by query' do
    get api_v1_profiles_url(query: @profile.name)

    names = response.parsed_body['profiles'].pluck('name')
    assert_includes names, @profile.name
  end

  test '#show' do
    get api_v1_profile_url(@profile)

    expected_json =
      {
        id: @profile.id,
        name: @profile.name,
        countryId: nil,
        contributor: false,
        photo: {
          original: '/images/original/missing.png',
          medium: '/images/medium/missing.png',
          thumb: '/images/thumb/missing.png'
        },
        personalScores: []
      }.deep_stringify_keys

    assert_equal expected_json, response.parsed_body
  end
end
