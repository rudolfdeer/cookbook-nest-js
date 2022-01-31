import { getRepository } from 'typeorm';
import { User } from '../entities/user.entity';

const userRepository = getRepository(User);
