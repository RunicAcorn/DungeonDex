using Microsoft.EntityFrameworkCore;

namespace API
{
    public class NPCService
    {
        private readonly ApplicationDbContext _context;

        public NPCService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<NPCDTO> GetNPCAsync(int id)
        {
          var npc = await _context.NPCs.Include(n => n.Campaign).FirstOrDefaultAsync(n => n.Id == id);
          if (npc == null)
          {
            throw new ArgumentException("NPC not found.");
          }

          var npcDTO = new NPCDTO
          {
            Id = npc.Id,
            Name = npc.Name,
            Race = npc.Race,
            Age = npc.Age,
            campaignId = npc.Campaign.CampaignId,
            Description = npc.Description,
            Notes = npc.Notes,
          };
          return npcDTO;
        }

    
        public async Task<List<NPC>> GetNPCsAsync(int campaignId)
        {
            return await _context.NPCs.Where(n => n.Campaign.CampaignId == campaignId).ToListAsync();
        }
        public async Task<NPC> AddNPCAsync(NPCDTO npc)
        {
            NPC newNPC = new NPC
            {
                Name = npc.Name,
                Race = npc.Race,
                Age = npc.Age,
                Campaign = await _context.Campaigns.FirstOrDefaultAsync(c => c.CampaignId == npc.campaignId),
                Description = npc.Description
            };
            _context.NPCs.Add(newNPC);
            await _context.SaveChangesAsync();
            return newNPC;
        }
        public async Task UpdateNPCAsync(NPCDTO npc)
        {
            var npcToUpdate = await _context.NPCs.FirstOrDefaultAsync(n => n.Id == npc.Id);
            npcToUpdate.Name = npc.Name;
            npcToUpdate.Race = npc.Race;
            npcToUpdate.Age = npc.Age;

            if(npc.Description != null)
            {
                npcToUpdate.Description = npc.Description;
            }

            if (npc.Notes != null)
            {
              npcToUpdate.Notes = npc.Notes;
            }


             await _context.SaveChangesAsync();

            }

        public async Task DeleteNPCAsync(int id)
        {
            var npc = await _context.NPCs.FirstOrDefaultAsync(n => n.Id == id);
            _context.NPCs.Remove(npc);
            await _context.SaveChangesAsync();
        }
    }
}
