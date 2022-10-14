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

  async findAllWithPagination(paginationQuery: any): Promise<any> {
    const { limit, offset } = await paginationQuery;
    return await this.repo.findAndCount({
      skip: offset,
      take: limit,
    });
  }

  async store(data: any): Promise<any> {
    return await this.repo.save(data);
  }

  async findSingle(options: any): Promise<any> {
    return await this.repo.findOne(options);
  }

  async findById(_id: any, options?: any): Promise<any> {
    return await this.repo.findOne(_id);
  }

  async update(_id: ObjectID, options: any): Promise<any> {
    const update = await this.repo.update(_id, { ...options });
    // .createQueryBuilder()
    // .update(options)
    // .where({
    //   _id,
    // })
    // .returning('*')
    // .execute();
    return update.raw[0];
    return update;
    // update(_id, { ...options });
  }
}
