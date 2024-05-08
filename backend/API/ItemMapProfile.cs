using AutoMapper;

namespace API
{
  public class ItemMapProfile : Profile
  {

  
    public ItemMapProfile()
    {
      

      CreateMap<ItemDTO, Item>()
          .ForMember(dest => dest.Campaign, opt => opt.MapFrom<CampaignResolver>());

      CreateMap<Item, ItemDTO>()
        .Include<Weapon, WeaponDTO>()
        .Include<Potion, PotionDTO>()
        .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.GetType().Name));
      CreateMap<Weapon, WeaponDTO>();
      CreateMap<Potion, PotionDTO>();
     
    }
  }
}
