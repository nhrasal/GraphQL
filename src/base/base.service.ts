import { Repository } from 'typeorm';

export abstract class BaseService<Entity> extends Repository<Entity> {
  repo: Repository<Entity>;
  entity: Entity;

  constructor(private repository: any, private ent: any) {
    super(ent, repository);
    this.repo = this.repository;
  }

  async getAll(options?: any): Promise<any> {
    const payload = await this.repo.findAndCount(options);
    return payload;
  }
  async store(data: any): Promise<any> {
    return await this.repo.save(data);
  }

  async findSingle(options: any): Promise<any> {
    return await this.repo.findOne(options);
  }

  async findById(id: any, options?: any): Promise<any> {
    return await this.repo.findOne({ _id: id, ...options });
  }

  async update(id: string, options: any): Promise<any> {
    return await this.repo.save({ id: id, ...options });
  }
}
