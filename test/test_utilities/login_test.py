from utilities.login import *

def test_login_customer():
    assert len(login_customer('ASD', '123')) == 1


def test_login_admin():
    assert len(login_admin('mohammad', '123')) == 1


def test_login_store():
    assert len(login_store('abadis', '123')) == 1