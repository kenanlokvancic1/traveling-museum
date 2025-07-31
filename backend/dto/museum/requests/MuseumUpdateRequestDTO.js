import MuseumUpdateRequestDto from "../dtos/museum/museum-update-request.dto.js";

export const updateMuseum = async (req, res, next) => {
  try {
    const updateDto = new MuseumUpdateRequestDto(req.body);
    const updatedMuseum = await museumService.updateMuseum(
      req.params.id,
      updateDto
    );
    return res.status(200).json(new MuseumResponseDto(updatedMuseum));
  } catch (error) {
    next(error);
  }
};