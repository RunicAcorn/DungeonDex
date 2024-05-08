using API;
using AutoMapper;

public class CampaignResolver : IValueResolver<ItemDTO, Item, Campaign>
{
  private readonly ApplicationDbContext _context;

  public CampaignResolver(ApplicationDbContext context)
  {
    _context = context;
  }

  public Campaign Resolve(ItemDTO source, Item destination, Campaign destMember, ResolutionContext context)
  {
    return _context.Campaigns.Find(source.CampaignId);
  }
}
