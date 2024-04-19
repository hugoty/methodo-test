import PauseService from './pause.service';

// Mock du repository
const mockPauseRepository = {
    getUserById: jest.fn(),
    getSessionById: jest.fn(),
    getPauseBySessionId: jest.fn(),
    addPause: jest.fn(),
    getPauseById: jest.fn(),
    updatePause: jest.fn(),
    deletePause: jest.fn(),
};

const pauseService = new PauseService(mockPauseRepository);

describe('PauseService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should add a pause', async () => {
        const pause = { /* vos données de pause ici */ };
        mockPauseRepository.getSessionById.mockResolvedValue({});
        mockPauseRepository.getPauseBySessionId.mockResolvedValue(null);
        await pauseService.addPause('userId', 'sessionId', pause);
        expect(mockPauseRepository.addPause).toHaveBeenCalledWith('userId', 'sessionId', pause);
    });

    it('should get a pause by id', async () => {
        const pause = { /* vos données de pause ici */ };
        mockPauseRepository.getUserById.mockResolvedValue({});
        mockPauseRepository.getSessionById.mockResolvedValue({});
        mockPauseRepository.getPauseById.mockResolvedValue(pause);
        const result = await pauseService.getPauseById('userId', 'sessionId', 'pauseId');
        expect(result).toEqual(pause);
        expect(mockPauseRepository.getPauseById).toHaveBeenCalledWith('userId', 'sessionId', 'pauseId');
    });

    it('should throw an error if pause not found', async () => {
        mockPauseRepository.getUserById.mockResolvedValue({});
        mockPauseRepository.getSessionById.mockResolvedValue({});
        mockPauseRepository.getPauseById.mockResolvedValue(null);
        await expect(pauseService.getPauseById('userId', 'sessionId', 'pauseId')).rejects.toThrow('Pause not found');
    });

    it('should update a pause', async () => {
        const pause = { /* vos nouvelles données de pause ici */ };
        mockPauseRepository.getUserById.mockResolvedValue({});
        mockPauseRepository.getSessionById.mockResolvedValue({});
        mockPauseRepository.getPauseById.mockResolvedValue({});
        await pauseService.updatePause('userId', 'sessionId', 'pauseId', pause);
        expect(mockPauseRepository.updatePause).toHaveBeenCalledWith('userId', 'sessionId', 'pauseId', pause);
    });

    it('should delete a pause', async () => {
        mockPauseRepository.getUserById.mockResolvedValue({});
        mockPauseRepository.getSessionById.mockResolvedValue({});
        mockPauseRepository.getPauseById.mockResolvedValue({});
        mockPauseRepository.deletePause.mockResolvedValue(1);
        const result = await pauseService.deletePause('userId', 'sessionId', 'pauseId');
        expect(result).toEqual({ message: "Pause deleted successfully" });
        expect(mockPauseRepository.deletePause).toHaveBeenCalledWith('userId', 'sessionId', 'pauseId');
    });

    it('should throw an error if pause not found or already deleted', async () => {
        mockPauseRepository.getUserById.mockResolvedValue({});
        mockPauseRepository.getSessionById.mockResolvedValue({});
        mockPauseRepository.getPauseById.mockResolvedValue({});
        mockPauseRepository.deletePause.mockResolvedValue(0);
        await expect(pauseService.deletePause('userId', 'sessionId', 'pauseId')).rejects.toThrow('Pause not found or already deleted');
    });
});
