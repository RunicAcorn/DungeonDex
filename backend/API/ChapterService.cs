using Microsoft.EntityFrameworkCore;


public class ChapterService
{
    private readonly ApplicationDbContext _context;

    public ChapterService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int?> GetNextChapterOrder(int campaignId)
    {
        var nextChapterId = await _context.Chapters
            .Where(chapter => chapter.CampaignId == campaignId)
            .OrderByDescending(chapter => chapter.Order)
            .Select(chapter => chapter.Order)
            .FirstOrDefaultAsync();

        return nextChapterId + 1;
    }

    public async Task<int> AddNewChapterAsync(int campaignId, string title, int order)
    {
        // First, verify that the campaign exists.
        var campaignExists = await _context.Campaigns.AnyAsync(c => c.CampaignId == campaignId);
        if (!campaignExists)
        {
            throw new ArgumentException("The specified campaign does not exist.");
        }

        var chapter = new Chapter
        {
            CampaignId = campaignId,
            Title = title,
            Order = order
        };

        _context.Chapters.Add(chapter);
        await _context.SaveChangesAsync();

        return chapter.ChapterId;
    }

    public async Task<List<Chapter>> GetChaptersByCampaignIdAsync(int campaignId)
    {
        // Fetch chapters that belong to the specified campaign, ordered by their 'Order' property
        var chapters = await _context.Chapters
            .Where(chapter => chapter.CampaignId == campaignId)
            .OrderBy(chapter => chapter.Order)
            .ToListAsync();

        return chapters;
    }



    public async Task DeleteChapterAsync(int campaignId, int chapterId)
    {
        var chapter = await _context.Chapters.FirstOrDefaultAsync(c => c.ChapterId == chapterId && c.CampaignId == campaignId);
        if (chapter == null)
        {
            throw new ArgumentException("Chapter not found.");
        }

        _context.Chapters.Remove(chapter);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateChapterAsync(int chapterId, string title, int order)
    {
        var chapter = await _context.Chapters.FindAsync(chapterId);
        if (chapter == null)
        {
            throw new ArgumentException("Chapter not found.");
        }

        chapter.Title = title;
        chapter.Order = order;

        await _context.SaveChangesAsync();
    }


}
