from causality.orm.image import Image as ImageDB
from causality.orm.training_set import TrainingSet as TrainingSetDB
from .object import Image


class ImageData:
    @staticmethod
    def record_to_object(record):
        return Image(id=record.id, path=record.path, label=record.label)

    @staticmethod
    def find_by_id(id):
        record = ImageDB.query.get(id)
        return ImageData.record_to_object(record)

    @staticmethod
    def list(training_set_id, offset=0, limit=100):
        training_set_record = TrainingSetDB.query.get(training_set_id)
        return [ImageData.record_to_object(image) for image in training_set_record.images]
