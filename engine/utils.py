
class Namespace:
    # to use args in notebook
    def __init__(self, **kwargs):
        self.__dict__.update(kwargs)