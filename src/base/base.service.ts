import { ObjectID, Repository } from 'typeorm';

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

  async findById(_id: any, options?: any): Promise<any> {
    return await this.repo.findOne({ where: { _id: _id }, ...options });
  }

  async update(_id: ObjectID, options: any): Promise<any> {
    return await this.repo.update(_id, { ...options });
  }
}
