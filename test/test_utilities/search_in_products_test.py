from utilities.search_in_products import search_in_products

def test_search_products():
    assert len(search_in_products('l340')) >= 1