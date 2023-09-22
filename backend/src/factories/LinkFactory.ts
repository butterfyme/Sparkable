import { LinkDto } from '../contexts/links/domain/models/LinkDto';
import { CategoryEntity } from '../contexts/links/infrastructure/persistence/entities/CategoryEntity';
import { LinkEntity } from '../contexts/links/infrastructure/persistence/entities/LinkEntity';
import { v4 as uuidv4 } from 'uuid';
import dataSource from '../data-source';

export default class LinkFactory {
  private static readonly linkDto:LinkDto = {
    id: 0,
    title: 'title',
    uuid: '',
    username: 'admin',
    url: 'https://www.butterfy.me/',
    image:
      'https://uploads-ssl.webflow.com/5fe2721ea6fb441f47d88866/5fe2726881e6e52053a0217c_Butterfy_Logo-p-500.png',
    description: 'description',
    categories: [],
    userUuid: 'userUuid',
    date: new Date(),
    statement: 'Statement ...',
    suggestionCategory: 'Sports',
    stage: 1,
    updateDate: new Date(0),
  };

  public static async create(
    params?: {
      title?: string;
      categories?: Array<CategoryEntity>;
      userUuid?: string;
      uuid?: string;
      stage?: number
    }
  ): Promise<LinkDto> {
    const linkRepository = dataSource.getRepository(LinkEntity);
    const link = linkRepository.create({ ...this.linkDto });

    link.uuid = uuidv4();
    link.date = new Date();
    if (params?.title) link.title = params.title;
    if (params?.categories) link.categories = params.categories;
    if (params?.userUuid) link.userUuid = params.userUuid;
    if (params?.uuid) link.uuid = params.uuid;
    if (params?.stage) link.stage = params.stage;

    return await linkRepository.manager.save(link);
  }

  public static async createX(
    x: number,
    categories?: Array<CategoryEntity>,
    stage?: number
  ) {
    for (let index = 0; index < x; index++) {
      await LinkFactory.create({
        categories,
        title: this.linkDto.title + index,
        stage: stage || 1
      });
    }
  }

}