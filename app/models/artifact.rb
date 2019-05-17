class Artifact < ApplicationRecord
  belongs_to :project
  mount_uploader :key, ArtifactKeyUploader


  MAX_FILESIZE = 10.megabytes
  validates_presence_of :name, :key
  validates_uniqueness_of :name

  validate :uploaded_file_size

  private
  def uploaded_file_size
    if key
      errors.add(:key, "File size must be less than #{self.class::MAX_FILESIZE}") unless key.size <= self.class::MAX_FILESIZE
    end
  end

end
