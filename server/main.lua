---------------------
--    CO MAVEN     --
-- GITHUB : COKLUK --
-- S 4 L E H#4119  --
---------------------

ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

ESX.RegisterServerCallback("S4.GET.PLAYER.INV", function(source, cb)
    cb({inv = ESX.GetPlayerFromId(source).inventory})
end)

RegisterNetEvent('S4.CHANGESLOT.INV')
AddEventHandler('S4.CHANGESLOT.INV', function(data)
   local xPlayer = ESX.GetPlayerFromId(source)
   local item = xPlayer.GetItemBySlot(data.o)
   if item then 
   xPlayer.removeInventoryItem(item.name, 1, item.slot)
   xPlayer.addInventoryItem(item.name, item.count, data.n, item.info)
   end
end)

RegisterNetEvent('S4.REMOVE.INV')
AddEventHandler('S4.REMOVE.INV', function(data)
   local xPlayer = ESX.GetPlayerFromId(source)
   local item = xPlayer.GetItemBySlot(data.i)
   if item then 
   xPlayer.removeInventoryItem(item.name, 1, item.slot)
   end
end)

RegisterNetEvent('S4.USE.INV')
AddEventHandler('S4.USE.INV', function(data)
   local xPlayer = ESX.GetPlayerFromId(source)
   local item = xPlayer.GetItemBySlot(data.i)
   local itemInfo =  ESX.GetItems()[tostring(item.name)]
   if item ~= nil then 
     
	 if item.usable  then
	    if item.name == "bankcard" then
			TriggerClientEvent("new_banking:client:banka", source, item.info.isim, item.info.iban, item.info.aitlik)
	    elseif item.name == "phone" then
		   if not item.info.durum then 
              item.info.durum = "kilitli"
           end			   
		   TriggerClientEvent("s4-phone:client:telefon", source, item.info.telno,  item.info.aitlik, item.info.durum)
	    end
	 end
	 
   end
   
end)