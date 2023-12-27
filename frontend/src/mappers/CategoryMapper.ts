export default abstract class CategoryMapper {
  static toDomain(persistenceCategory: any) {
    return {
      id: persistenceCategory.id,
      name: persistenceCategory.name,
    };
  }
}
