import zipfile
def unpack_files():
    with zipfile.ZipFile("data/ludnosc.zip",'r') as zip_ref:
        zip_ref.extractall("data/ludnosc_shp")