import SessionPortService from './sessionPort.service.js';
import SessionPortRepository from './sessionPort.repository.js';

describe('SessionPortService', () => {
    let sessionPortService;
    let mockSessionPortRepository;

    beforeEach(() => {
        mockSessionPortRepository = new SessionPortRepository();
        sessionPortService = new SessionPortService(mockSessionPortRepository);
    });

    it('should add a session', async () => {
        const mockSession = { id: 1, name: 'Test Session' };
        const mockUser = { id: 1, name: 'Test User' };

        mockSessionPortRepository.getUserById = jest.fn().mockResolvedValue(mockUser);
        mockSessionPortRepository.getSessionByUserId = jest.fn().mockResolvedValue(null);
        mockSessionPortRepository.addSession = jest.fn().mockResolvedValue(mockSession);

        const result = await sessionPortService.addSession(1, mockSession);
        expect(result).toEqual(mockSession);
        expect(mockSessionPortRepository.addSession).toHaveBeenCalledWith(1, mockSession);
    });

    it('should get a session by id', async () => {
        const mockSession = { id: 1, name: 'Test Session' };
        const mockUser = { id: 1, name: 'Test User' };

        mockSessionPortRepository.getUserById = jest.fn().mockResolvedValue(mockUser);
        mockSessionPortRepository.getSessionById = jest.fn().mockResolvedValue(mockSession);

        const result = await sessionPortService.getSessionById(1, 1);
        expect(result).toEqual(mockSession);
        expect(mockSessionPortRepository.getSessionById).toHaveBeenCalledWith(1, 1);
    });

    it('should update a session', async () => {
        const mockSession = { id: 1, name: 'Updated Session' };
        const mockUser = { id: 1, name: 'Test User' };

        mockSessionPortRepository.getUserById = jest.fn().mockResolvedValue(mockUser);
        mockSessionPortRepository.getSessionById = jest.fn().mockResolvedValue(mockSession);
        mockSessionPortRepository.updateSession = jest.fn().mockResolvedValue(mockSession);

        const result = await sessionPortService.updateSession(1, 1, mockSession);
        expect(result).toEqual(mockSession);
        expect(mockSessionPortRepository.updateSession).toHaveBeenCalledWith(1, 1, mockSession);
    });

    it('should delete a session', async () => {
        const mockResponse = { message: "Session deleted successfully" };
        const mockUser = { id: 1, name: 'Test User' };
        const mockSession = { id: 1, name: 'Test Session' };

        mockSessionPortRepository.getUserById = jest.fn().mockResolvedValue(mockUser);
        mockSessionPortRepository.getSessionById = jest.fn().mockResolvedValue(mockSession);
        mockSessionPortRepository.deleteSession = jest.fn().mockResolvedValue(1);

        const result = await sessionPortService.deleteSession(1, 1);
        expect(result).toEqual(mockResponse);
        expect(mockSessionPortRepository.deleteSession).toHaveBeenCalledWith(1, 1);
    });
});
